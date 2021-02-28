import {observable, action, makeObservable, computed, configure, runInAction} from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import agent from '../api/agent';
import { ICoffee } from '../models/coffee';

configure({enforceActions: 'always'});

export class CoffeeStore {
    constructor() {
        makeObservable(this);
      }

    @observable coffeeReistry = new Map();
    @observable coffees: ICoffee[] = [];
    @observable selectedCoffee: ICoffee | undefined;
    @observable loadingInit = false;
    @observable editMode = false;
    @observable submitting = false;
    @observable target = '';

    @computed get coffeesByDate() {
        return Array.from(this.coffeeReistry.values()).sort
        ((a, b) => Date.parse(a.date) - Date.parse(b.date))
    }

    @action loadCoffees = async () => {
        this.loadingInit = true;
        try {
            const coffees = await agent.Coffees.list();
            runInAction(() => {
                coffees.forEach((coffee) => {
                    coffee.date = coffee.date.split('.')[0];
                    this.coffeeReistry.set(coffee.id, coffee);
            })
          });
          this.loadingInit = false;
        }
        catch (error) {
            console.log(error);
            runInAction(() => {
                this.loadingInit = false;
            })
        }
    };

    @action createCoffee = async (coffee: ICoffee) => {
        this.submitting = true;
        try {
            await agent.Coffees.create(coffee);
            runInAction(() => {
                this.coffeeReistry.set(coffee.id, coffee);
                this.editMode = false;
                this.submitting = false;
            })
        } catch (error) {
            runInAction(() => {
                this.submitting = false;
            })
            console.log(error);
        }

    };

    @action editCoffee = async (coffee: ICoffee) => {
        this.submitting = true;
        try {
            await agent.Coffees.update(coffee);
            runInAction(() => {
                this.coffeeReistry.set(coffee.id, coffee);
                this.selectedCoffee = coffee;
                this.editMode = false;
                this.submitting = false;
            })
        } catch (error) {
            this.submitting = false;
            console.log(error);
        }
    }
    //test

    @action deleteCoffee = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try {
            await agent.Coffees.delete(id);
            this.coffeeReistry.delete(id);
            this.submitting = false;
            this.target = '';
        } catch (error) {
            console.log(error);
            this.target = '';
        }
    }

    @action openCreateForm = () => {
        this.editMode = true;
        this.selectedCoffee = undefined;
    }

    @action openEditForm = (id: string) => {
        this.selectedCoffee = this.coffeeReistry.get(id);
        this.editMode = true;
    }

    @action cancelSelectedCoffee = () => {
        this.selectedCoffee = undefined;
    }

    @action cancelFormOpen = () => {
        this.editMode = false;
    }

    @action selectCoffee = (id: string) => {
        this.selectedCoffee =this.coffeeReistry.get(id);
        this.editMode = false;
    } 

}

export default createContext(new CoffeeStore())