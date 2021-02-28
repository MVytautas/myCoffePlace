import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Button, Card, Icon, Image } from 'semantic-ui-react'
import { ICoffee } from '../../../app/models/coffee'
import CoffeeStore from '../../../app/stores/coffeeStore';

const CoffeeDetails: React.FC = () => {
  const coffeeStore = useContext(CoffeeStore);
  const {selectedCoffee: coffee, openEditForm, cancelSelectedCoffee} = coffeeStore;
    return (
        <Card fluid>
        <Image src='assets/placeholder.png' wrapped ui={false} />
        <Card.Content>
          <Card.Header>{coffee!.name}</Card.Header>
          <Card.Meta>
            <span>{coffee!.date}</span>
          </Card.Meta>
          <Card.Description>
            {coffee!.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group widths={2}>
              <Button onClick={() => openEditForm(coffee!.id)} basic color='blue' content='Edit' />
              <Button onClick={cancelSelectedCoffee} basic color='grey' content='Cancel' />
          </Button.Group>
        </Card.Content>
      </Card>
    )
}

export default observer(CoffeeDetails);