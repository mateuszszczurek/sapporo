import 'rc-collapse/assets/index.css';
import Collapse, {Panel} from 'rc-collapse';
import React from 'react';

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

    render() {
        const accordion = this.state.accordion;
        const activeKey = this.state.activeKey;

        return <Collapse
            accordion={accordion}
            onChange={this.onChange}
            activeKey={activeKey}
        >
            <Panel header='Tabela'>
            </Panel>
            <Panel header='Mecze'>
            </Panel>
            <Panel header='Wprowadź mecz'>
            </Panel>
        </Collapse>

    }
}

export default TourneyDetails;