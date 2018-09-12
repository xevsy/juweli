import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Route, Switch } from 'react-router'
import FrontPage from '../components/FrontPage'
import Dashboard from '../components/cabinet/Dashboard'
import AddItem from '../components/cabinet/AddItem'
import EditItem from '../components/cabinet/EditItem'
import NotFoundPage from '../components/NotFoundPage'
import AddCategory from '../components/cabinet/AddCategory'
import BucketPage from '../components/BucketPage'

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path={"/"} component={FrontPage} exact={true} />
        <Route path={"/bucket"} component={BucketPage} exact={true} />
        <Route path={"/cabinet"} component={Dashboard} exact={true}/>
        <Route path={"/cabinet/newCategory"} component={AddCategory} />
        <Route path={"/cabinet/newProduct"} component={AddItem} />
        <Route path={"/cabinet/edit/:id"} component={EditItem} />
        <Route component={NotFoundPage}/>
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
