/* ----------
all routes needs to be defined inline
see https://github.com/bigwheel-framework/documentation/blob/master/routes-defining.md#as-section-standard-form
---------- */
let routes = {
	'/': require('./sections/home'),
	'/home': { section: require('./sections/home') },
	'/about': { section: require('./sections/about') },
	'/work/:id': { section: require('./sections/section'), duplicate: true }
};

export default routes