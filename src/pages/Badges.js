import React from 'react';
import { Link } from 'react-router-dom';

import './styles/Badges.css';
import header from '../images/badge-header.svg';
import BadgesList from '../components/BadgesList.js';
import PageLoading from '../components/PageLoading.js';
import PageError from '../components/PageError.js';
import MiniLoader from '../components/MiniLoader.js';
import api from '../api'

class Badges extends React.Component {
  constructor(props) {
    super(props)
    console.log('1. constructor()')
    
    this.state = {
      loading: true,
      error: null,
      data: undefined
    }
  }

  componentDidMount() {
    console.log('3. componentDidMount()');

    this.fetchData()

    this.intervalId = setInterval(this.fetchData, 5000)
  }

  fetchData = async () => {
    this.setState({ loading: true, error: null })

    try {
      const data = await api.badges.list()
      this.setState({ loading: false, data: data })
    } catch(error) {
      this.setState({ loading: false, error: error })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('5. componentDidUpdate()')
    console.log({
      prevProps: prevProps, prevState: prevState
    })

    console.log({
      props: this.props, state: this.state
    })
  }

  componentWillUnmount() {
    console.log('6. componentWillUnmount()')

    clearInterval(this.intervalId);
  }

  render() {
    if (this.state.loading === true && !this.state.data) {
      return <PageLoading />
    }

    if (this.state.error) {
      return <PageError error={this.state.error} />
    }

    console.log('2/4. render()');
    return (
      <React.Fragment>
        <div className="Badges">
          <div className="Badges__hero">
            <div className="Badges__container">
              <img 
                className="Badges_conf-logo" 
                src={header} 
                alt="Conf Logo" 
              />
            </div>
          </div>
        </div>

        <div className="Badges__container">
          <div className="Badges__buttons">
            <Link to="/badges/new" className="btn btn-primary">
              New Badge
            </Link>
          </div>
        </div>

        <div className="Badges__list">
          <div className="Badges__container">
            <BadgesList badges={this.state.data} />

            {this.state.loading && (<MiniLoader />)}
          </div>
        </div>

      </React.Fragment>
    );
  }
}

export default Badges;