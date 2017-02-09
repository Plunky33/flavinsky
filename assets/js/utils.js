import ajax from 'please-ajax';
import create from 'dom-create-element';

/* ----------
utils
---------- */
let utils = {
	
	css: {
		
		getRect(top=0, right, bottom, left=0) {

			return `rect(${top}px, ${right}px, ${bottom}px, ${left}px)`;

		}
		
	},
	
	js: {
		
		arrayFrom(opt) {
			
			return Array.prototype.slice.call(opt, 0);
			
		},

		clamp(min, value, max) {

			return Math.max(min, Math.min(value, max));

		},
		
		scrollTop() {

			if (window.pageYOffset) return window.pageYOffset;
			return document.documentElement.clientHeight ? document.documentElement.scrollTop : document.body.scrollTop;
			
		}

	},
	
	biggie: {
		
		getSlug(req) {
			
			let route = req.route;
			let routeDuplicate = req.params.id;
			
			// TODO :
			// - add 'default' route case
			if(route === "/") route = '/home';
			// - replace :id in route by the current section's id to get the template
			// needs to be ':id' in routes.js
			if(routeDuplicate) {
				route = route.substring(0, route.length - 3);
				route += routeDuplicate;
			}

			let slug = route.substr(1).replace('/', '-');
			
			return slug;

		},
		
		createPage(req, slug) {
				
			let page = create({
				selector: 'div',
				id: 'page-'+slug,
				styles: 'page page-'+slug
			});
			
			return page;

		},
		
		loadPage(req, view, done) {
			
			let slug = utils.biggie.getSlug(req);
			let page = utils.biggie.createPage(req, slug);
			
			ajax.get('templates/'+slug+'.html', {
				success: (object) => {
					page.innerHTML = object.data;
					done();
				}
			});

			return view.appendChild(page);

		}

	}

}

export default utils