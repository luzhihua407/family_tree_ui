import React, { Component } from 'react'
import withRouter from 'umi/withRouter'
import { I18nProvider } from '@lingui/react'
import { ConfigProvider } from 'antd'
import { langFromPath, defaultLanguage } from 'utils'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import BaseLayout from './BaseLayout'
const languages = {
  zh: zh_CN,
}
const locale = zh_CN
@withRouter
class Layout extends Component {
  state = {
    catalogs: {},
  }

  language = defaultLanguage

  componentDidMount() {
    const language = langFromPath(this.props.location.pathname)
    this.language = language
    this.loadCatalog(language)
  }

  shouldComponentUpdate(nextProps, nextState) {
    const language = langFromPath(nextProps.location.pathname)
    const preLanguage = this.language
    const { catalogs } = nextState

    if (preLanguage !== language && !catalogs[language]) {
      this.loadCatalog(language)
      this.language = language
      return false
    }
    this.language = language

    return true
  }

  loadCatalog = async language => {
    const catalog = await import(
      /* webpackMode: "lazy", webpackChunkName: "i18n-[index]" */
      `@lingui/loader!../locales/${language}/messages.json`
    )

    this.setState(state => ({
      catalogs: {
        ...state.catalogs,
        [language]: catalog,
      },
    }))
  }

  render() {
    const { location, children } = this.props
    const { catalogs } = this.state

    let language = langFromPath(location.pathname)
    // If the language pack is not loaded or is loading, use the default language
    if (!catalogs[language]) language = defaultLanguage

    return (
      <ConfigProvider locale={locale}>
        <I18nProvider language={language} catalogs={catalogs}>
          <BaseLayout>{children}</BaseLayout>
        </I18nProvider>
      </ConfigProvider>
    )
  }
}

export default Layout
