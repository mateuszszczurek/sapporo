import 'rc-collapse/assets/index.css';
import Collapse, {Panel} from 'rc-collapse';
import React from 'react';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

function random() {
    return parseInt(Math.random() * 10, 10) + 1;
}

class TourneyDetails extends React.Component {

    state = {
        time: random(),
        accordion: true,
        activeKey: ['4'],
    };

    onChange = (activeKey) => {
        this.setState({
            activeKey,
        });
    };

    getItems() {
        const items = [];
        for (let i = 0, len = 3; i < len; i++) {
            const key = i + 1;
            items.push(
                <Panel header={`This is panel header ${key}`} key={key}>
                    <p>adssad</p>
                </Panel>
            );
        }

        return items;
    }

    render() {
        const accordion = this.state.accordion;
        const activeKey = this.state.activeKey;

        return <Collapse
            accordion={accordion}
            onChange={this.onChange}
            activeKey={activeKey}
        >
            <Panel header='Tabela'>
                <p></p>
            </Panel>
            <Panel header='Mecze'>
                <p></p>
            </Panel>
            <Panel header='Wprowadź mecz'>
                <p></p>
            </Panel>
        </Collapse>

    }
}

export default TourneyDetails;