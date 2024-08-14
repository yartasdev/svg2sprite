import { cosmiconfigSync } from 'cosmiconfig';
import { SVGConfig } from './config.interface';
import { glob } from 'glob';
import { JSDOM } from 'jsdom';
import { optimize } from 'svgo';
import { outputFileSync, readFileSync } from 'fs-extra';
import { join, relative } from 'path';

export function createSVGSpriteWithConfig(dir: string = process.cwd()) {
	const search = cosmiconfigSync('svg2sprite').search(dir);

	const configs: SVGConfig[] | null = search?.config;

	if (!configs) throw new Error('Please create a config file in your root directory with "svg2sprite.config.{.js,.cjs,.ts}"');

	createSVGSprite(configs);
}

export function createSVGSprite(configs: SVGConfig[]) {
	for (const config of configs) {
		if (!config.target) throw new Error('Please specify a target folder!');
		if (!config.output) throw new Error('Please specify a output folder!');

		const svgs = glob.sync(config.target + '/**/*.svg');

		if (!svgs || !svgs.length) throw new Error('No .svg file was found in the folder you specified.');

		const symbols: string[] = [];

		for (const svg of svgs) {
			const identifier = getIdentifierNameForSprite(svg, config.target);

			const { data } = optimize(readFileSync(svg, { encoding: 'utf8' }), {
				...config.svgo,
			});

			const dom = new JSDOM(data);

			const el = dom.window.document.querySelector('svg');

			if (!el) continue;

			const symbol = dom.window.document.createElement('symbol');
			symbol.setAttribute('id', identifier);

			el.childNodes.forEach(child => symbol.appendChild(child));

			const viewBox = el.getAttribute('viewBox');

			if (viewBox) {
        symbol.setAttributeNS(null, 'viewBox', viewBox);
			}

			symbols.push(symbol.outerHTML);
		}

		const sprite = `<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">${symbols.join('')}</svg>`;

		outputFileSync(join(config.output, 'sprite.svg'), sprite, {
			encoding: 'utf8',
		});
	}
}

export function getIdentifierNameForSprite(path: string, target: string) {
	const rel = slash(relative(target, path));
	return identify(rel);
}

function slash(path: string) {
	const isExtendedLengthPath = path.startsWith('\\\\?\\');
	if (isExtendedLengthPath) return path;
	return path.replace(/\\/g, '/');
}

function identify(path: string) {
	return (path.substring(0, path.lastIndexOf('.')) || path).split('/').join('-');
}
