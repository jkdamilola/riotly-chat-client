
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './style.scss';

import { toggleMembers } from '../../redux/actions';
import * as fromRooms from '../../redux/room/reducers';

class Members extends Component {
  render() {
    const { activeRoom } = this.props;

    if (!this.props.show) {
      return false;
    }

    const members = activeRoom.members;

    return (
      <div className="members_container">
        <header>
          <span dangerouslySetInnerHTML={{ __html: `Room '${activeRoom.topic}' has ${members.length + 1} member(s)` }} />

          <span>
            <i
              className="icon-ion-android-close"
              onClick={e => this.props.toggleMembers(false)} />
          </span>
        </header>

        <ul className="list">
          <li key={activeRoom.owner._id}
            style={{
              color: 'rgb(0, 0, 0)',
            }}>
            <div
              className="cover"
              style={{
                backgroundImage: `url(${activeRoom.owner.picture})`,
              }} 
            />
              <span
                className="member_name"
                dangerouslySetInnerHTML={{ __html: activeRoom.owner.name }} />
            </li>
            {
              members.map((e, index) => {
                const frontColor = [0, 0, 0];

                return (
                  <li
                    key={index}
                    style={{
                      color: `rgb(
                        ${frontColor[0]},
                        ${frontColor[1]},
                        ${frontColor[2]}
                      )`,
                    }}>
                    <div
                      className="cover"
                      style={{
                        backgroundImage: `url(${e.picture})`,
                      }} />
                    <span
                      className="member_name"
                      dangerouslySetInnerHTML={{ __html: e.name }} />
                  </li>
                );
              })
            }
        </ul>
      </div>
    );
  }
}

Members.propTypes = {
  activeRoom: PropTypes.object,
  activeUser: PropTypes.object,
  show: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  return {
    activeRoom: fromRooms.getRoomById(state.room, state.room.activeRoom),
    activeUser: state.auth.user,
    show: state.room.showMembers,
  }
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleMembers,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Members);