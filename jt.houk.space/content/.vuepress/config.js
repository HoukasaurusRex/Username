const getConfig = require('vuepress-bar')
require('dotenv-defaults').config()

const articles = getConfig(`${__dirname}/../articles`)
const portfolio = getConfig(`${__dirname}/../projects`)
portfolio.sidebar[0] = ['/projects/', '<- Back to Portfolio']

const exists = (item) => item && item !==' ...' ? item : null

module.exports = {
  title: 'JT\'s Space',
  description: 'Software Engineer • Cloud Architect • DevOps',
  metaDescription: 'A space for JT Houk\'s thoughts, works, and ideas. I\'m a Software Engineer • Cloud Architect • DevOps guy living in the web. Shoot me an email or contact me on Twitter for collaborations, freelancing, or talking tech!',
  image: 'https://jt.houk.space/assets/8bitme-right.jpg',
  tags: [
    'JT',
    'Houk',
    'Freelance',
    'Developer',
    'Cloud Architect',
    'DevOps',
    'Full Stack'
  ],
  serviceWorker: true,
  evergreen: true,
  plugins: [
    ['seo', {
      siteTitle: (_, $site) => $site.title,
      title: ($page, $site) => exists($page.title) || $site.title,
      description: ($page, $site) => exists($page.frontmatter.description) || $site.metaDescription || $site.description,
      author: (_, $site) => $site.themeConfig.author,
      tags: ($page, $site) => exists($page.frontmatter.tags) || $site.tags,
      twitterCard: $page => exists($page.frontmatter.image) ? 'summary_large_image' : 'summary',
      type: $page => ['articles', 'posts', 'blog'].some(folder => $page.regularPath.startsWith('/' + folder)) ? 'article' : 'website',
      url: (_, $site, path) => ($site.themeConfig.domain || '') + path,
      image: ($page, $site) => exists($page.frontmatter.image) || $site.image,
      publishedAt: $page => $page.frontmatter.created_at && new Date($page.frontmatter.created_at),
      modifiedAt: $page => $page.updated_at && new Date($page.updated_at),
      customMeta: (add, { $site, $page }) => {
        add('twitter:image:src', exists($page.frontmatter.image) || $site.image)
        add('twitter:creator', $site.themeConfig.author)
        add('description', exists($page.frontmatter.description) || $site.metaDescription || $site.description)
      },
    }],
    ['vuepress-plugin-mailchimp', {
      endpoint: process.env.MC_API,
      title: 'Subscribe',
      content: 'Get my latest posts. No spam.',
      submitText: 'Subscribe',
      popupConfig: {
        enabled: popupEnabled = true,
        timeout: popupTimeout = 4000
      }
    }],
    ['@vuepress/pwa', {
      serviceWorker: true,
      updatePopup: false,
      skipWaiting: true
    }]
  ],
  head: [
    ['link', { rel: 'icon', href: '/jt-face-logo.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['link', { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-152x152.png' }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: 'rgb(235, 141, 175)' }],
    ['meta', { name: 'theme-color', content: 'rgb(235, 141, 175)' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
    ['meta', { name: 'application-name', content: 'JT' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'JT' }],
    ['meta', { name: 'msapplication-navbutton-color', content: 'rgb(235, 141, 175)' }],
    ['meta', { name: 'msapplication-starturl', content: '/' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' }],
    ['script', {
      ['data-host']: 'https://microanalytics.io',
      src: 'https://microanalytics.io/js/script.js',
      id: process.env.MICRO_ANALYTICS_ID,
      async: true,
      defer: true
    }]
    // ['script', { async: true, src: 'https://platform.twitter.com/widgets.js', charset: 'utf-8' }]
  ],
  themeConfig: {
    repo: 'HoukasaurusRex',
    author: '@HoukasaurusRex',
    domain: 'jt.houk.space',
    hostname: 'https://jt.houk.space',
    smoothScroll: true,
    env: {
      CMS_API: process.env.CMS_API,
      DISQUS_API_KEY: process.env.DISQUS_API_KEY
    },
    notification: {
      id: 'irc-afghan-refugees',
      title: 'Help Refugees in Afghanistan',
      description: 'Donate to the IRC to provide humanitarian aid and resettlement resources to Afghan refugees',
      link: 'https://help.rescue.org/donate/afghanistan'
    },
    nav: [
      {
        text: 'Articles',
        link: '/articles/'
      },
      {
        text: 'Portfolio',
        link: '/projects/'
      },
      {
        text: 'About',
        link: '/about/'
      },
      {
        text: 'Labs',
        link: 'https://labs.houk.space'
      },
      {
        text: 'RaW',
        link: 'https://rulesaswrittenshow.com'
      },
      {
        text: 'Get In Touch',
        link: 'mailto:jt@houk.space?subject=Hello%20From%20Your%20Site&body='
      }
    ],
    sidebar: {
      '/articles/': articles.sidebar,
      '/projects/': portfolio.sidebar
    },
    footer: {
      contact: [
        {
          type: 'github',
          link: 'https://github.com/HoukasaurusRex',
        },
        {
          type: 'twitter',
          link: 'https://twitter.com/HoukasaurusRex',
        },
        {
          type: 'linkedin',
          link: 'https://linkedin.com/in/jt-houk'
        },
        {
          type: 'mail',
          link: 'mailto:jt@houk.space?subject=Hello%20From%20Your%20Site&body='
        }
      ],
      copyright: [{
        text: `JT Houk © ${new Date().getFullYear()}`
      }]
    },
    directories: [
      {
        id: 'articles', // Unique id for current classifier
        dirname: 'articles', // Matched directory name
        path: '/articles/', // Entry page for current classifier
        title: 'Articles', // Entry and pagination page titles for current classifier
        // itemLayout: 'Writing', // Layout for matched pages.
        itemPermalink: '/articles/:slug', // Permalink for matched pages.
        pagination: { // Pagination behavior
          lengthPerPage: 5,
        },
        frontmatter: {
          type: 'post',
          feed: {
            enable: true
          }
        }
      }
    ],
    feed: {
      canonical_base: 'https://jt.houk.space'
    },
  }
}