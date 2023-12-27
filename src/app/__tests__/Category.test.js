import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { test001 } from '@/app/data/dataToTest';
import CategoryComponent from '@/app/components/category';

test('renders the Category\'s children: Sub-Categories & Utilities', () => {
    render(<CategoryComponent category={test001.categories[0]} index={0}/>);

    test001.categories[0].subcategories.forEach(element => {
        const subcate = screen.getByText(element.name);
        expect(subcate).toBeInTheDocument();
    });
  });
