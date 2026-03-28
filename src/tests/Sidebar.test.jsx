import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

// Wrapper component for router context
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Sidebar Accessibility', () => {
  test('has proper navigation landmark', () => {
    renderWithRouter(<Sidebar />);
    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(nav).toBeInTheDocument();
  });

  test('renders all navigation links with accessible labels', () => {
    renderWithRouter(<Sidebar />);
    const links = screen.getAllByRole('link');
    
    // Verify all links have accessible labels
    links.forEach(link => {
      const label = link.getAttribute('aria-label');
      expect(label).toBeTruthy();
    });
  });

  test('navigation items are keyboard accessible', () => {
    renderWithRouter(<Sidebar />);
    const firstLink = screen.getByRole('link', { name: 'Campaigns' });
    
    // Focus the link
    firstLink.focus();
    expect(firstLink).toHaveFocus();
    
    // Tab to next link
    fireEvent.keyDown(firstLink, { key: 'Tab', code: 'Tab' });
  });

  test('active link has correct aria-current attribute', () => {
    renderWithRouter(<Sidebar />);
    const activeLink = screen.getByRole('link', { name: 'Campaigns' });
    expect(activeLink).toHaveAttribute('aria-current', 'page');
  });

  test('icons are hidden from screen readers', () => {
    renderWithRouter(<Sidebar />);
    const icons = screen.getAllByText('⚔️');
    icons.forEach(icon => {
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  test('has proper list semantics', () => {
    renderWithRouter(<Sidebar />);
    const list = screen.getByRole('list');
    const listItems = screen.getAllByRole('listitem');
    
    expect(list).toBeInTheDocument();
    expect(listItems.length).toBe(10); // 10 nav items
  });
});

export default Sidebar;