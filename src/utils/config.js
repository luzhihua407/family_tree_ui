module.exports = {
  siteName: '盧氏迺炯公后裔族譜',
  copyright: '星火  © 2019',
  logoPath: '/lu.jpg',
  apiPrefix: '/api/v1',
  fixedHeader: true, // sticky primary layout header

  /* Layout configuration, specify which layout to use for route. */
  layouts: [
    {
      name: 'primary',
      include: [/.*/],
      exlude: [/(\/(en|zh))*\/login/],
    },
  ],

  /* I18n configuration, `languages` and `defaultLanguage` are required currently. */
  i18n: {
    /* Countrys flags: https://www.flaticon.com/packs/countrys-flags */
    languages: [
      {
        key: '',
        title: '',
        flag: '',
      },
    ],
    defaultLanguage: 'zh',
  },
}
