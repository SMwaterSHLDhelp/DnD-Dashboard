import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Link } from '@heroui/react';

export default function App() {
  return (
    <div className="min-h-screen bg-default-50">
      <Navbar>
        <NavbarBrand>
          <p className="font-bold text-inherit">D&D Campaign Tracker</p>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button color="primary" variant="solid">Get Started</Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Welcome, Dungeon Master</h1>
        <p className="text-lg mb-6">Build worlds, manage sessions, and track everything — all in one place.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Campaign & World Building</h2>
            <p>Store lore, maps, locations, factions, and history.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Session Management</h2>
            <p>Plan sessions, track notes, and summarize outcomes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
