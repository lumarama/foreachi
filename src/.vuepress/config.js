module.exports = {
  title: 'forEach(i)',
  description: "Dev's Notes",
  dest: 'dist-temp',
  
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' }
    ],
    sidebar: {
      '/clean-code/': [
        '',
        'good-name-please'
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
        '/flutter/',
        '/android/'
      ]
    }
  },

  plugins: [
    [
      '@vuepress/google-analytics',
      {
        'ga': 'UA-17026194-4'
      }
    ]
  ]
}
