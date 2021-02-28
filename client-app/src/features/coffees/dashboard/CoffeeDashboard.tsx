import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useContext } from 'react'
import { Grid, List } from 'semantic-ui-react'
import { ICoffee } from '../../../app/models/coffee'
import CoffeeDetails from '../details/CoffeeDetails'
import  CoffeeForm from '../form/CoffeeForm'
import CoffeeList from './CoffeeList'
import CoffeeStore from '../../../app/stores/coffeeStore';

const CoffeeDashboard: React.FC= () => {
    const coffeeStore = useContext(CoffeeStore);
    const {editMode, selectedCoffee} = coffeeStore;
    return (
        <Grid>
            <Grid.Column width={10}>
                <CoffeeList />
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedCoffee && !editMode && 
                (<CoffeeDetails />
                )}
                {editMode && 
                    <CoffeeForm 
                    key={selectedCoffee && selectedCoffee.id || 0}
                    coffee={selectedCoffee!} 
                    /> }
            </Grid.Column>
        </Grid>
    )
};

export default observer(CoffeeDashboard);

