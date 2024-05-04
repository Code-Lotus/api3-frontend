import { Component, useState } from "react";
import { Database } from "../../scripts/controllers/localStorage";

type Props = {
    valores: Array<string>
}

type State = {
    selectedOption: string
}

export default class Select extends Component<Props, State>{
    constructor(props: Props){
        super(props)
        this.state = {
            selectedOption: ''
        };
    }
    
    handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({selectedOption: event.target.value})
    }

    render(){
        const {valores} = this.props
        const {selectedOption} = this.state

        return (
            <>
                <select value={selectedOption} onChange={this.handleSelectChange}>
                    {valores.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </>
        )
    }
}