import React, { Component } from 'react';
import { Table, Button } from "semantic-ui-react";
import web3 from './web3';
import myToDoList from './myToDoList';

class RequestRow extends Component {
    onApprove = async () => {
        const accounts = await web3.eth.getAccounts();
        await myToDoList.methods.markCompleted(this.props.id).send({
            from: accounts[0]
        });
    };

   render() {
    const { Row, Cell } = Table;
    const { id, task } = this.props;

    return (
        <Row>
            <Cell>{id}</Cell>
            <Cell>{task.taskContent}</Cell>
            <Cell>
                <Button color='teal' basic onClick={this.onApprove}>
                    Mark task Completed!
                </Button>
                
            </Cell>
        </Row>
    );
   }

}
export default RequestRow;