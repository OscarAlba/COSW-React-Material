import React from 'react';

export class Todo extends React.Component {

    render() {
        return (
            <tr>
                <td>{this.props.text}</td>
                <td>{this.props.priority}</td>
                <td>{this.props.dueDate}</td>
                <td>{this.props.fileUrl ? <img src={this.props.fileUrl} /> : <div/>}</td>
            </tr>
        );
    }

}