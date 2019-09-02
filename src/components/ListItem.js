import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  LayoutAnimation,
} from 'react-native';
import {connect} from 'react-redux';
import {CardSection} from './common';
import * as actions from '../actions';

class ListItem extends Component {
  componentDidUpdate() {
    LayoutAnimation.spring(); 
  }
  renderDescription() {
    const {library, expanded} = this.props;
    if (expanded) {
      return (
        <CardSection>
          <Text style={{flex: 1, paddingLeft: 15, paddingRight: 10}}>
            {library.item.description}
          </Text>
        </CardSection>
      );
    }
  }

  render() {
    // console.log('ListItem props------>', this.props.library.item.title);
    // console.log('----?', this.props);
    const {titleStyle} = styles;
    const {title, id} = this.props.library.item;
    return (
      <TouchableWithoutFeedback onPress={() => this.props.selectLibrary(id)}>
        <View>
          <CardSection>
            <Text style={titleStyle}>{title}</Text>
          </CardSection>
          {this.renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15,
  },
});

const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedLibraryId === ownProps.library.item.id;
  return {expanded};
};

export default connect(
  mapStateToProps,
  actions,
)(ListItem);
