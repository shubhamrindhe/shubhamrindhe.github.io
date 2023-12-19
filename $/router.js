const coreRoutes = {
	sketch: {
		$: () => {
			document.body.innerHTML = "1011"
		}
	}
}

const routeMap = { ...coreRoutes }
const addRoute = (_) => { routeMap = { ...routeMap, ..._ } }

const routeHandler = (e) => {
	e.preventDefault()
	navigateTo(e.target.href)
	// console.log(e.target.href)

	navik()
}

const navigateTo = url => {
	history.pushState(null, null, url)
}

const anchorLinks = (query = '[data-link]') => {
	document.querySelectorAll(query).forEach(anchor => { anchor.onclick = routeHandler })
}

//

const pathToRegex = path => new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$');

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

	console.log(match.route.path, Array.from( match.route.path.matchAll(/:(\w+)/g) ));
	console.log(keys);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

const navik = ({ host, pathname } = window.location) => {
	// hash: ""
	// host: "127.0.0.1:5501"
	// hostname: "127.0.0.1"
	// href: "http://127.0.0.1:5501/laboratory/guineapigs/"
	// origin: "http://127.0.0.1:5501"
	// pathname: "/laboratory/guineapigs/"
	// port: "5501"
	// protocol: "http:"

	// window.location

	const routes = [
        { path: "/", view: "Dashboard" },
        { path: "/posts", view: "Posts" },
        { path: "/posts/:id", view: "PostView" },
		{ path: "/posts/:id/:oo", view: "PostView" },
        { path: "/settings", view: "Settings" }
    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {

		// console.log(location.pathname.match(pathToRegex(route.path)));

        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);
	// console.log(match);

    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
		}
		console.error("NO MATCCH");
	}

	// const view = new match.route.view(getParams(match));
	console.log('0', match.route.view);
	console.log(match, getParams(match));
}

window.addEventListener('popstate', (e) => {
	// route(e)
	console.log(e.target.href, e)
	// navigateTo(e.target.href)
})

export {
	routeHandler,
	addRoute,
	anchorLinks
};
