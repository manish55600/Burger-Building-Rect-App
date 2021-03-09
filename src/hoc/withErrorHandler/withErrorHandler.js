import React, { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Auxiliary/Auxiliary'

const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {

        _isMounted = false
        constructor(props) {
            super(props)
            this.state = {
                error: null
            }
        }

        componentDidMount () {
            this._isMounted = true
            this.reqInterceptors = axios.interceptors.request.use(req => {
                this.setState({ error: null })
                return req
            })
            this.resInterceptors = axios.interceptors.response.use(res => {
                return res
            }, error => {
                this.setState({ error: error })
            })
        }

        componentWillUnmount () {
            this._isMounted = false
            axios.interceptors.request.eject(this.reqInterceptors)
            axios.interceptors.response.eject(this.resInterceptors)
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null })
        }

        render () {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        { this.state.error ? this.state.error.message : null }
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    } 
    // return class extends Component {

    //     state = {
    //         error: null
    //     }

    //     componentDidMount () {
    //         axios.interceptors.request.use(req => {
    //             this.setState({ error : null })
    //             return req
    //         })

    //         axios.interceptors.response.use(res => res, error => {
    //             this.setState({ error : error })
    //         })
    //     }

    //     errorConfirmedHandler = () => {
    //         this.setState({ error: null })
    //     }

    //     render () {
    //         return (
    //             <Aux>
    //             <Modal show={this.state.error}
    //                 clicked={this.errorConfirmedHandler}>
    //                 {this.state.error ? this.state.error.message : null}
    //             </Modal>
    //             <WrappedComponent {...this.props} />
    //         </Aux>
    //         )
    //     }
    // }
}

export default withErrorHandler