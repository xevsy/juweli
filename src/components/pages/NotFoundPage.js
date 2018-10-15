import React from 'react'
import Header from '../grid/Header'
import T from 'i18n-react'

const NotFoundPage = () => (
  <div className="App">
    <Header />
    <p className="App-intro">
      {T.translate("common.pageNotFound")}
    </p>
  </div>
);

export default NotFoundPage;
