import { useState } from 'react';
// DEPENDENCIES
// SERVICES
import AdminService from '../../../services/AdminService';
// INITIALIZATION
const adminService = new AdminService();
// INTERFACES
// export interface IDashboardProps {}

export default function AutomationQA(/* props: IDashboardProps */) {
	const [testState, setTestState] = useState(false);

	async function getAdmin() {
		const randomNumber = Math.floor(Math.random() * 100);
		const data = await adminService.getAdmins(randomNumber);
		console.log(data);
	}

	return (
		<div>
			<h1 className="text-4xl font-bold text-primary">Automation QA</h1>
			<button onClick={() => getAdmin()} className="btn">
				Test 1
			</button>
			<button onClick={() => setTestState(!testState)} className="btn">
				Test 1
			</button>
		</div>
	);
}
