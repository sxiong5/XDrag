import { reactive } from 'vue';

export default reactive([
	{
		title: 'To Do',
		list: [
			{
				title: 'Deploy Library',
				content: 'Deploy to internate',
				avatar: new URL('./assets/IMG_0590.JPG', import.meta.url).href
			},
			{
				title: 'Complete the Docs',
				content: 'Finish the documents',
				avatar: new URL('./assets/IMG_0589.JPG', import.meta.url).href
			},
			{
				title: 'Intruduce to public',
				content: '',
				avatar: new URL('./assets/IMG_0587.JPG', import.meta.url).href
			}
		]
	},
	{
		title: 'Processing',
		list: [
			{
				title: 'Component Tests',
				content: 'Test the function',
				avatar: new URL('./assets/IMG_0586.JPG', import.meta.url).href
			},
			{
				title: 'Add Customize Props',
				content: 'Add some props to components',
				avatar: new URL('./assets/IMG_0588.JPG', import.meta.url).href
			}
		]
	},
	{
		title: 'Done',
		list: [
			{
				title: 'Init the Project',
				content: 'Build the project and get start it',
				avatar: new URL('./assets/IMG_0587.JPG', import.meta.url).href
			},
			{
				title: 'Adjust the Structure',
				content: 'Make an adjustment to menu',
				avatar: new URL('./assets/IMG_0590.JPG', import.meta.url).href
			},
			{
				title: 'Component Design',
				content: 'Design the component',
				avatar: new URL('./assets/IMG_0589.JPG', import.meta.url).href
			}
		]
	}
]);
