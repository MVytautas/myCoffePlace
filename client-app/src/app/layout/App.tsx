import React, { useState, useEffect, Fragment, SyntheticEvent, useContext } from 'react';
import { Container, Header, Icon, List } from 'semantic-ui-react'
import { ICoffee } from '../models/coffee';
import NavBar from '../../features/nav/NavBar';
import CoffeeDashboard from '../../features/coffees/dashboard/CoffeeDashboard';
import { LoadingComponents } from './LoadingComponents';
import CoffeeStore from '../stores/coffeeStore';
import { observer } from 'mobx-react-lite';

const App = () => {
  const coffeeStore = useContext(CoffeeStore);

  useEffect(() => {
    coffeeStore.loadCoffees();
    }, [coffeeStore]);

    if (coffeeStore.loadingInit) return <LoadingComponents content='Loading list..' />

  return (
    <Fragment >
        <NavBar/>
        <p>
          save to reload.
        </p>
        <Container style={{marginTop: '6em'}}>
          <CoffeeDashboard />
        </Container>
        
        
    </Fragment>
  );

}

export default observer(App);
