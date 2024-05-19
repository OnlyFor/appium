import _ from 'lodash';
import {
  DESKTOP_BROWSERS,
  DESKTOP_DRIVERS,
  MOBILE_DRIVERS
} from '../constants';
import {runExtensionCommand} from './extension';
import { fs, system } from '@appium/support';
import log from '../logger';

/**
 * Subcommands of preset for setup
 */
export const SUBCOMMAND_MOBILE = 'mobile';
export const SUBCOMMAND_DESKTOP = 'desktop';
export const SUBCOMMAND_BROWSER = 'browser';

/**
 * Pairs of preset subcommand and driver candidates.
 * Driver names listed in KNOWN_DRIVERS to install by default
 */
const PRESET_PAIRS = Object.freeze(
  /** @type {const} */ ({
    mobile: _.keys(MOBILE_DRIVERS),
    desktop: _.keys(DESKTOP_DRIVERS),
    browser: _.keys(DESKTOP_BROWSERS)
  }),
);
const DRIVERS_ONLY_MACOS = ['xcuitest', 'safari', 'mac2'];

/**
 * Plugin names listed in KNOWN_PLUGINS to install by default.
 */
export const DEFAULT_PLUGINS = ['images'];

/**
 * Return a list of drivers available for current host platform.
 * @param {import('appium/types').CliCommandSetupSubcommand} subcmd
 * @returns {Array<string>}
 */
export function getPresetDrivers(subcmd) {
  return _.filter(PRESET_PAIRS[subcmd], (driver) =>
    (!system.isMac() && _.includes(DRIVERS_ONLY_MACOS, driver))
    ? null
    : driver
  );
}

/**
 * Return desktop platform name for setup command description.
 * @returns {string}
 */
export function hostPlatformName() {
  if (system.isMac()) {
    return 'macOS';
  } else if (system.isWindows()) {
    return 'Windows';
  }
  return 'Linux';
}

/**
 * Run 'setup' command to install drivers/plugins into the given appium home.
 * @template {import('appium/types').CliCommandSetup} SetupCmd
 * @param {import('appium/types').Args<SetupCmd>} preConfigArgs
 * @param {string} appiumHome
 * @param {DriverConfig} driverConfig
 * @param {PluginConfig} pluginConfig
 * @returns {Promise<void>}
 */
export async function runSetupCommand(appiumHome, preConfigArgs, driverConfig, pluginConfig) {
  switch (preConfigArgs.setupCommand) {
    case SUBCOMMAND_DESKTOP:
      await setupDesktopAppDrivers(driverConfig);
      await setupDefaultPlugins(pluginConfig);
      break;
    case SUBCOMMAND_BROWSER:
      await setupBrowserDrivers(driverConfig);
      await setupDefaultPlugins(pluginConfig);
      break;
    default:
      await setupMobileDrivers(driverConfig);
      await setupDefaultPlugins(pluginConfig);
      break;
  }
};

/**
 * Install drivers listed in DEFAULT_DRIVERS.
 * @param {DriverConfig} driverConfig
 * @returns {Promise<void>}
 */
async function setupMobileDrivers(driverConfig) {
  await installDrivers(SUBCOMMAND_MOBILE, driverConfig);
}

/**
 * Install all of known drivers listed in BROWSER_DRIVERS.
 * @param {DriverConfig} driverConfig
 * @returns {Promise<void>}
 */
async function setupBrowserDrivers(driverConfig) {
  await installDrivers(SUBCOMMAND_BROWSER, driverConfig);
}

/**
 * Install all of known drivers listed in DESKTOP_APP_DRIVERS.
 * @param {DriverConfig} driverConfig
 * @returns {Promise<void>}
 */
async function setupDesktopAppDrivers(driverConfig) {
  await installDrivers(SUBCOMMAND_DESKTOP, driverConfig);
}

/**
 * Install the given driver name. It skips the installation if the given driver name was already installed.
 * @param {import('appium/types').CliCommandSetupSubcommand} subcommand
 * @param {DriverConfig} driverConfig
 * @returns {Promise<void>}
 */
async function installDrivers(subcommand, driverConfig) {
  for (const driverName of getPresetDrivers(subcommand)) {
    await installExtention(driverName, extensionCommandArgs('driver', driverName, 'install'), driverConfig);
  }
}

/**
 * Install plugins listed in DEFAULT_PLUGINS.
 * @param {PluginConfig} pluginConfig
 * @returns {Promise<void>}
 */
async function setupDefaultPlugins(pluginConfig) {
  for (const pluginName of DEFAULT_PLUGINS) {
    await installExtention(pluginName, extensionCommandArgs('plugin', pluginName, 'install'), pluginConfig);
  }
}

/**
 * Run the given extensionConfigArgs command after checking if the given extentionName was already installed.
 * @param {string} extentionName
 * @param {Args} extensionConfigArgs
 * @param {DriverConfig|PluginConfig} extentionConfig
 * @returns
 */
async function installExtention(extentionName, extensionConfigArgs, extentionConfig) {
  if (_.keys(extentionConfig.installedExtensions).includes(extentionName)) {
    log.info(`${extentionName} (${extentionConfig.installedExtensions[extentionName].version}) is already installed. ` +
      `Skipping the installation.`);
    return;
  }
  await runExtensionCommand(extensionConfigArgs, extentionConfig);
}

/**
 * Return the command config for driver or plugin.
 * @param {CliExtensionCommand} extentionCommand
 * @param {string} extentionName
 * @param {CliExtensionSubcommand} command
 * @returns {Args}
 */
function extensionCommandArgs(extentionCommand, extentionName, command) {
  if (extentionCommand === 'plugin') {
      return {
        'subcommand': 'plugin',
        'pluginCommand': command,
        'plugin': extentionName
      };
  }
  return {
    'subcommand': 'driver',
    'driverCommand': command,
    'driver': extentionName
  };
}

/**
 * @typedef {import('appium/types').CliExtensionCommand} CliExtensionCommand
 * @typedef {import('appium/types').CliExtensionSubcommand} CliExtensionSubcommand
 * @typedef {import('../extension/extension-config').ExtensionConfig<CliExtensionCommand>} PluginConfig
 * @typedef {import('../extension/extension-config').ExtensionConfig<CliExtensionCommand>} DriverConfig
 */

/**
 * @typedef {import('appium/types').Args<CliExtensionCommand, CliExtensionSubcommand>} Args
 */
