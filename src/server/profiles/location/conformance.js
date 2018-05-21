const { generateSearchParamsForConformance } = require('../../utils/conformance.utils');
const { resolveFromVersion } = require('../../utils/resolve.utils');
const { routes } = require('./location.config');

/**
 * @name exports
 * @summary Patient conformance statement
 */
module.exports = {
	profile: 'location',
	resource: (version, count) => {
		let searchParams = generateSearchParamsForConformance(routes, version);
		let Location = require(resolveFromVersion(version, 'uscore/Location'));
		// Return our conformance statement
		return {
			extension: [{
				url: 'http://hl7api.sourceforge.net/hapi-fhir/res/extdefs.html#resourceCount',
				// This will be resolved dynamically by the service methods
				valueDecimal: count
			}],
			type: Location.__resourceType,
			profile: {
				reference: 'http://hl7.org/fhir/location.html'
			},
			interaction: [{
				code: 'read'
			}, {
				code: 'search'
			}],
			searchParam: searchParams
		};
	}
};
