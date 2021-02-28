import React, {FormEvent, useContext, useState} from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { ICoffee } from '../../../app/models/coffee'
import {v4 as uuid} from 'uuid';
import CoffeeStore from '../../../app/stores/coffeeStore';
import { observer } from 'mobx-react-lite';

interface IProps {
    coffee: ICoffee;
}

const CoffeeForm: React.FC<IProps> = ({
    coffee: initialFormState,
    }) => {

    const coffeeStore = useContext(CoffeeStore);
    const {createCoffee, editCoffee, submitting, cancelFormOpen} = coffeeStore;

    const initializeForm = () => {
        if (initialFormState) {
            return initialFormState
        } else {
            return {
                id: '',
                name: '',
                description: '',
                price: 0,
                image: '',
                date: ''
            }
        }
    };

    const [coffee, setCoffee] = useState<ICoffee>(initializeForm);

    const handleSubmit = () => {
        if (coffee.id.length === 0) {
            let newCoffee = {
                ...coffee,
                id: uuid()
            }
            createCoffee(newCoffee);
        } else {
            editCoffee(coffee);
        }
    }

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.currentTarget;
        setCoffee({...coffee, [name]: value})
    } 

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input onChange={handleInputChange} name='name' placeholder='Name' value={coffee.name} />
                <Form.TextArea onChange={handleInputChange} name='description' rows={2} placeholder='Description' value={coffee.description}/>
                <Form.Input onChange={handleInputChange} name='price' type='number' placeholder='Price' value={coffee.price}/>
                <Form.Input 
                    onChange={handleInputChange} 
                    name='date' 
                    type='datetime-local' 
                    placeholder='Date' 
                    value={coffee.date}/>
                <Form.Button color='blue' content='Upload Image' placeholder='Image' value={coffee.image}/>
                <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
                <Button onClick={cancelFormOpen} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}

export default observer(CoffeeForm);