module.exports = {
  title: 'foreach i',
  description: "Code snippets for developers",
  dest: 'dist',
  
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' }
    ],
    sidebar: {
      '/clean-code/': 'auto',
      '/aws/': [
        '',
        'dynamodb-javascript',
        'serverless-websockets'
      ],
      '/flutter/': [
        '',
        'provider-cheatsheet'
      ],
      '/devops/': [
        '',
        'git-cli-cheatsheet',
      ],
      '/android/': [
        '',
        'androidx-proguard'
      ],
      '/': [
        '',
        '/clean-code/',
        '/aws/',
        '/flutter/',
        '/devops/',
        '/android/'
      ]
    }
  },


  head: [
  ['script', {'async src': 'https://www.googletagmanager.com/gtag/js?id=UA-17026194-4'}, ''],
  ['script', {}, `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'UA-17026194-4');
  `]]
}
