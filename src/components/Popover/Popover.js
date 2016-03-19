import React from 'react';
import classNames from 'classnames';
import tbsUtils from './utils/bootstrapUtils';
import isRequiredForA11y from 'react-prop-types/lib/isRequiredForA11y';

const PopoverMenu = React.createClass({

  propTypes: {

    /**
     * An html id attribute, necessary for accessibility
     * @type {string}
     * @required
     */
    id: React.PropTypes.string
  },

  render() {
    let popoverMenu;

    if(true) {
      popoverMenu = (
        <div style={{ height: 120 }}>
          <RootCloseWrapper noWrap onRootClose={this.onClose}>
            <PopoverMenu
              id="popove-menu"
              title="PopoverMenu bottom">
                <strong>Holy guacamole!</strong> Check this info.
            </PopoverMenu>
          </RootCloseWrapper>
        </div>
      )
    }


  }

});
