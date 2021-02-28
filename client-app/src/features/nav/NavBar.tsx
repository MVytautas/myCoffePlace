import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'
import CoffeeStore from '../../app/stores/coffeeStore';


const NavBar: React.FC = () => {
    const coffeeStore = useContext(CoffeeStore);
    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '8px'}}/>
                    PreCoffee
                </Menu.Item>
                <Menu.Item
                name='Coffees'/>
                <Menu.Item>
                    <Button onClick={coffeeStore.openCreateForm} positive content='Create Coffee'/>
                </Menu.Item>
            </Container>
      </Menu>
    )
}

export default observer(NavBar);