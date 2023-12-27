import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import { test001 } from '@/app/data/dataToTest';
import Menu from '../../components/nav/Menu';
import { debug } from 'jest-preview';


describe(Menu, () => {
   
    it('Renders the main menu for Mobile with Categories text', () => {
        const cates = test001.categories;
        render(<Menu categories={cates} selectedIndex={0}/>);
        const theText = screen.getByText(/Categories/i);
        expect(theText).toBeInTheDocument();
    });

    it('Renders the main menu with all Categories are Menu items', () => {
        const cates = test001.categories;
        const { getAllByRole } = render(<Menu categories={cates} selectedIndex={0}/>);
        const aLinks = getAllByRole('link');

        cates.forEach((element, index) => {
            expect(element.name).toEqual(aLinks[index].textContent);
        });
        
    });

    it('Renders the bottom Menu with About, Edit, Config & Buy me a coffee', () => {
        const cates = test001.categories;
        const { getAllByRole } = render(<Menu categories={cates} selectedIndex={0}/>);
        const uLists = getAllByRole('list');

        const uBottoms = uLists.filter(element => {
            return (element.className == "menuBottom");
        });
        expect(uBottoms).toHaveLength(2);
        
        uBottoms.forEach(uElement => {
            const childNodes = uElement.childNodes;
            expect(childNodes[0].querySelector('a').textContent).toEqual('About');
            expect(childNodes[1].querySelector('a').textContent).toEqual('Edit');
            expect(childNodes[2].querySelector('a').textContent).toEqual('Config');
            expect(childNodes[3].querySelector('a').textContent).toEqual('Buy me a coffee');
        });
    });

    it('Renders Menu as snapshot', () => {
        const cates = test001.categories;
        const component = renderer.create(<Menu categories={cates} selectedIndex={1}/>);
        const screen = component.toJSON();
        expect(screen).toMatchSnapshot();
    });

/*
it('Bottom Menu, click on About get the Back to Categories; then click on Back to ... and return to About', async () => {
        //const user = userEvent.setup();

        const cates = test001.categories;
        const component = renderer.create(<Menu categories={cates} selectedIndex={0}/>);
        const screen = component.root;
        const aboutLinks = screen.findAllByProps({children: 'About'})[0];
        //screen.findAllByType('a')[0];
        //console.log(screen.findAllByType('a')[0]);
        console.log(aboutLinks.props.children);

        //expect(component.toJSON()).toMatchSnapshot();

        //const { getAllByRole } = render(<Menu categories={cates} selectedIndex={0}/>);
        

        //console.log(component.toJSON());
        /*

        debug();
        const aboutLinks = .getAllByRole('link', {name: 'About'});
        const firstAboutLink = aboutLinks[0];
        //console.log(firstAboutLink);

        //await user.click(firstAboutLink);

        //console.log(firstAboutLink.textContent);
        
        fireEvent.click(firstAboutLink);
        //fireEvent.mouseDown(firstAboutLink);
        fireEvent(
            firstAboutLink,
            new MouseEvent('click', {
              bubbles: true,
              cancelable: true,
            }),
          )
        //await user.pointer({keys: '[/MouseLeft]', target: firstAboutLink});
        //await user.click(firstAboutLink);
        waitFor(() => {
            console.log(firstAboutLink.textContent);
            expect(firstAboutLink.textContent).toEqual('Back to Categories');
            
        });
        
*/
        /*
        await user.click(firstAboutLink);
        console.log(firstAboutLink.textContent);
        expect(firstAboutLink.textContent).toEqual('About');
        
    });
});
*/
/*
test('Renders the menu correctly, switch mode to About, Edit & Config', () => {
    const component = renderer.create(<Menu categories={test001.categories} selectedIndex={0}/>);

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // About
/*    renderer.act(() => {
        tree.props.onSwitchMode(2);
    });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();


    // Edit
    renderer.act(() => {
        tree.props.onSwitchMode(1);
    });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

        // Config
    renderer.act(() => {
        tree.props.onSwitchMode(3);
    });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // Back to View
    renderer.act(() => {
        tree.props.onSwitchMode(0);
    });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
*/

});
