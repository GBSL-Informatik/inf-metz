// This file is never changed by teaching-dev.
// Use it to override or extend your app configuration.

import { VersionOptions } from '@docusaurus/plugin-content-docs';
import { SiteConfig, SiteConfigProvider } from '@tdev/siteConfig/siteConfig';
import { ScriptsBuilder } from './framework/builder/scriptsBuilder';
import { DevComponentGalleryNavbarItem, DevDevDocsNavbarItem, DevDocsNavbarItem } from './navbarItems';
import {
    commentPluginConfig,
    enumerateAnswersPluginConfig,
    kbdPluginConfig,
    linkAnnotationPluginConfig,
    mdiPluginConfig,
    mediaPluginConfig,
    pagePluginConfig,
    pdfPluginConfig,
    remarkMathPluginConfig,
    strongPluginConfig
} from './src/siteConfig/markdownPluginConfigs';
import {
    accountSwitcher,
    loginProfileButton,
    personalSpaceOverlay,
    requestTarget,
    taskStateOverview
} from './src/siteConfig/navbarItems';
import { remarkContainerDirectivesConfig } from './website/plugin-configs/remark-container-directives/plugin-config';
import { remarkLineDirectivesPluginConfig } from './website/plugin-configs/remark-line-directives/plugin-config';
import remarkContainerDirectives from './website/plugins/remark-container-directives/plugin';
import remarkLineDirectives from './website/plugins/remark-line-directives/plugin';

const REMARK_PLUGINS = [
    strongPluginConfig,
    mdiPluginConfig,
    mediaPluginConfig,
    kbdPluginConfig,
    remarkMathPluginConfig,
    enumerateAnswersPluginConfig,
    pdfPluginConfig,
    pagePluginConfig,
    [remarkContainerDirectives, remarkContainerDirectivesConfig], // TODO: Resolve this.
    [remarkLineDirectives, remarkLineDirectivesPluginConfig], // TODO: Resolve this.
    commentPluginConfig,
    linkAnnotationPluginConfig
] as any;

const GIT_COMMIT_SHA = process.env.GITHUB_SHA || Math.random().toString(36).substring(7);

const getSiteConfig: SiteConfigProvider = () => {
    const SCRIPTS_CONFIG_FILE = 'scriptsConfig.yaml';

    const versions: { [key: string]: VersionOptions } = {
        current: {
            badge: false,
            banner: 'none',
            path: 'docs'
        }
    };

    ScriptsBuilder.readScriptNames(SCRIPTS_CONFIG_FILE).forEach((scriptName: string) => {
        versions[scriptName] = {
            badge: false,
            banner: 'none'
        };
    });

    if (!process.env.NO_SYNC) {
        ScriptsBuilder.buildOnce(SCRIPTS_CONFIG_FILE);
    }

    return {
        title: 'Informatik F. Metz',
        tagline: 'Informatik',
        url: 'https://metz.gbsl.website',
        siteStyles: ['website/css/custom.scss'],
        navbarItems: [
            taskStateOverview,
            DevDocsNavbarItem,
            DevComponentGalleryNavbarItem,
            DevDevDocsNavbarItem,
            accountSwitcher,
            requestTarget,
            personalSpaceOverlay,
            loginProfileButton
        ].filter((item) => !!item),
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Tools',
                    items: [
                        {
                            label: 'Thonny',
                            to: 'https://thonny.org/'
                        },
                        {
                            label: 'VS Code',
                            to: 'https://code.visualstudio.com/'
                        },
                        {
                            label: 'Python',
                            to: 'https://www.python.org/'
                        }
                    ]
                },
                {
                    title: 'Meine Schule',
                    items: [
                        {
                            label: 'Passwort Zurücksetzen',
                            to: 'https://password.edubern.ch/'
                        },
                        {
                            label: 'Office 365',
                            to: 'https://office.com'
                        },
                        {
                            label: 'GBSL',
                            to: 'https://gbsl.ch'
                        },
                        {
                            label: 'Intranet',
                            to: 'https://erzbe.sharepoint.com/sites/GYMB/gbs'
                        },
                        {
                            label: 'Stundenplan',
                            to: 'https://mese.webuntis.com/WebUntis/?school=gym_Biel-Bienne#/basic/main'
                        },
                        {
                            label: '🧑🏽‍💻 Anleitungen BYOD / ICT',
                            to: 'https://ict.gbsl.website/'
                        },
                        {
                            label: '⛑️ IT-Support für Schüler*innen',
                            to: 'mailto:it-help-for-students@bernedu.ch'
                        }
                    ]
                }
            ],
            copyright: `<a class="footer__link-item" href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.de">
                          <img src="/img/by-nc-sa.eu.svg" alt="CC-BY-NC-SA">© ${new Date().getFullYear()} Friederike Metz</a> | Ausnahmen sind gekennzeichnet.<br/>
                          <a class="badge badge--primary" href="https://github.com/GBSL-Informatik/inf-metz/commits/${GIT_COMMIT_SHA}">
                            ᚶ ${GIT_COMMIT_SHA.substring(0, 7)}</a>`
        },
        onBrokenLinks: 'warn',
        docs: {
            lastVersion: 'current',
            routeBasePath: '',
            versions: versions
        },
        remarkPlugins: REMARK_PLUGINS,
        personalSpaceDocRootId: 'c3d604b1-deca-40c6-a6ae-66b74aac4f4f',
        gitHub: {
            orgName: 'GBSL-Informatik',
            projectName: 'inf-metz'
        }
    } as SiteConfig;
};

export default getSiteConfig;
