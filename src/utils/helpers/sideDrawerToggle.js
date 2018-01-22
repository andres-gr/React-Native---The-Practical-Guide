const sideDrawerToggle = function (options, { id, type }) {
    if (type === 'NavBarButtonPress') {
        switch (id) {
            case 'SideDrawer':
                this.props.navigator.toggleDrawer(options)
                break
                // no default
        }
    }
}

export default sideDrawerToggle
