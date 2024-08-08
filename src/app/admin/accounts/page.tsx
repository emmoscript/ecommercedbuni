import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { FaCoins, FaInfoCircle, FaTh, FaSignInAlt, FaCog, FaStore } from 'react-icons/fa';
import { SVGProps } from 'react';

export default function Component() {
  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-4">
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Admin</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Permissions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Admin1</TableCell>
                <TableCell>Super Admin</TableCell>
                <TableCell>SELECT, UPDATE, INSERT, DELETE, PATCH</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Admin2</TableCell>
                <TableCell>Editor</TableCell>
                <TableCell>SELECT, UPDATE, INSERT</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Admin3</TableCell>
                <TableCell>Viewer</TableCell>
                <TableCell>SELECT</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Admin4</TableCell>
                <TableCell>Contributor</TableCell>
                <TableCell>SELECT, INSERT</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Admin5</TableCell>
                <TableCell>Moderator</TableCell>
                <TableCell>SELECT, UPDATE, DELETE</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </main>
    </div>
  );
}

// Define props type for SVG icons
function CoinsIcon(props: SVGProps<SVGSVGElement>) {
  return <FaCoins {...props} />;
}

function InfoIcon(props: SVGProps<SVGSVGElement>) {
  return <FaInfoCircle {...props} />;
}

function LayoutDashboardIcon(props: SVGProps<SVGSVGElement>) {
  return <FaTh {...props} />;
}

function LogInIcon(props: SVGProps<SVGSVGElement>) {
  return <FaSignInAlt {...props} />;
}

function SettingsIcon(props: SVGProps<SVGSVGElement>) {
  return <FaCog {...props} />;
}

function StoreIcon(props: SVGProps<SVGSVGElement>) {
  return <FaStore {...props} />;
}
