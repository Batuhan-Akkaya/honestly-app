import React, {Component} from 'react';
import {View} from 'react-native';
import {TabBarTop} from 'react-navigation';
import Store from '../../config/store';
import {observer} from 'mobx-react';

@observer
class TabBar extends Component {
    render() {
        return (
            <View style={{height: Store.tabHeight}}>
                <TabBarTop {...this.props} />
            </View>
        )
    }
}

export default TabBar;