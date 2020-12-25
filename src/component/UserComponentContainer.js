import React from "react";
import * as PropTypes from "prop-types";

class UserComponentContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hidden : true};
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({hidden: false});
        }, this.props.waitBeforeShow);
    }

    render() {
        return this.state.hidden ? '' : this.props.children;
    }

}

UserComponentContainer.propTypes = {
    waitBeforeShow: PropTypes.number.isRequired
};

export default UserComponentContainer;