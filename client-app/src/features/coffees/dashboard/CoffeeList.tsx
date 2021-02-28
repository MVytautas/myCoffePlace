import { observer } from 'mobx-react-lite'
import React, { SyntheticEvent, useContext } from 'react'
import { Button, Image, Item, Label, Segment } from 'semantic-ui-react'
import { ICoffee } from '../../../app/models/coffee'
import CoffeeStore from '../../../app/stores/coffeeStore'

const CoffeeList: React.FC = () => {
    const coffeeStore = useContext(CoffeeStore);
    const {coffeesByDate, selectCoffee, deleteCoffee, submitting, target} = coffeeStore;
    return (
        <Segment clearing>
            <Item.Group divided>
                    {coffeesByDate.map(coffee => (
                        <Item key={coffee.id}> 
                        {/* <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' /> */}
                    
                        <Item.Content>
                            <Item.Header as='a'>{coffee.name}</Item.Header>
                            <Item.Meta>{coffee.date}</Item.Meta>
                            <Item.Description>
                                <div>{coffee.description}</div>
                                <div>{coffee.price}</div>
                            {/* <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' /> */}
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectCoffee(coffee.id)} 
                                floated='right' content='View' 
                                color='blue' />
                                <Button 
                                    name={coffee.id}
                                    loading={target === coffee.id && submitting} 
                                    onClick={(e) => deleteCoffee(e ,coffee.id)} 
                                    floated='right' content='Delete' 
                                    color='red' 
                                />
                                <Label basic content='Category' />
                            </Item.Extra>
                        </Item.Content>
                        </Item>
                    ))}
    
        </Item.Group>
        </Segment>
        
    )
}

export default observer(CoffeeList);