import React, { Component } from 'react';
import BackDrop from '../components/UI/Backdrop/Backdrop';

const errorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount() {
            this.reqInterceptors = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            })

            this.resInterceptors = axios.interceptors.response.use(res => {
                return res;
            }, error => {
                this.setState({error: error});
                console.log(error);
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }

        closeBackdrop = () => {
            this.setState({error: null});
        }
        render() {
            return (
                <>
                    <BackDrop show={this.state.error} close={this.closeBackdrop}>
                        <div className="error_message_parent">
                            <p className="error_message">
                                {this.state.error 
                                ?
                                    this.state.error.response
                                    ?
                                    this.state.error.response.data.errors[0].message 
                                    :
                                    null
                                : 
                                null}
                            </p>
                        </div>
                    </BackDrop>
                    <WrappedComponent {...this.props} />
                </>
            )
        }
    }
};

export default errorHandler;