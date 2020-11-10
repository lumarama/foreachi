module.exports = {
  title: 'forEach i',
  description: "Dev's Notes",
  dest: 'dist',
  
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' }
    ],
    sidebar: {
      '/clean-code/': [
        '',
        'good-name-please'
      ],
      '/aws/': [
        '',
        'aws-dynamodb-javascript'
      ],
      '/flutter/': [
        '',
        'provider-cheatsheet'
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
