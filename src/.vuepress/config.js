module.exports = {
  title: 'forEach(i)',
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
      '/android/': [
        '',
        'androidx-proguard'
      ],
      '/': [
        '',
        '/clean-code/',
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
