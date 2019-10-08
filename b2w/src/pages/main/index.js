import React, {Component} from 'react';
import api from '../../services/api';
import './styles.css'


export default class Main extends Component {
    state = {
        currentPlanet: '',
        currentPlanetFilms: ''
    };

    componentDidMount(){
        this.loadPlanet();
    }

    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

    loadPlanet = async () => {      
        var i = 1;
        var planetsArray = [];
        var response = await api.get('./planets/?page='+i);
        var index = this.getRandomIntInclusive(0, response.data.count);
        while(response.data.next != null)
        {
            planetsArray.push.apply(planetsArray, response.data.results)
            i++;
            response = await api.get('./planets/?page='+i);
        }
        console.log(index);
        this.setState({ currentPlanet: planetsArray[index] })
        this.setState({ currentPlanetFilms: planetsArray[index].films.length });
    }


    nextPlanet = () => {
        this.loadPlanet();
    }

    render() {
        const { currentPlanet } = this.state;
        const { currentPlanetFilms } = this.state;

        return (
            <div className='product-list'>
                    <article >
                        <strong> {currentPlanet.name}</strong>
                        <hr/>
                        <p class='attr'>Population: {currentPlanet.population}</p>
                        <p class='attr'>Climate: {currentPlanet.climate}</p>
                        <p class='attr'>Terrian: {currentPlanet.terrain}</p>
                        <p id='nfilms'>Featured in {currentPlanetFilms} films</p>

                        
                    </article>
                    <button onClick={this.nextPlanet} >Next</button>
            </div>
        );
    }
}