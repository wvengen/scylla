import * as React from 'react';
import axios from "axios";
import {getBaseURL, Provider, ProvidersResponseJSON} from "../utils";

import moment from 'moment'

export interface ProvidersProps {
}

export interface ProvidersState {
    providers: Provider[];
}

export default class Providers extends React.Component<ProvidersProps, ProvidersState> {
    constructor(props: ProvidersProps) {
        super(props);

        this.state = {
            providers: [],
        }
    }

    render() {
        const {providers} = this.state;

        return (
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>Provider</th>
                        <th>IPs available</th>
                        <th>IPs valid</th>
                        <th>Updated at</th>
                    </tr>
                    </thead>
                    <tbody>
                    {providers.map(r =>
                        <tr key={r.provider}>
                            <td>{r.name}</td>
                            <td>{r.ips_available}</td>
                            <td>{r.ips_valid}</td>
                            <td>{!!r.updated_at && moment.unix(r.updated_at).format('YYYYMMDD HH:mm:ss')}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        );
    }

    componentDidMount() {
        this.loadData()
    }

    async loadData() {
        const response = await axios.get(`${getBaseURL()}/api/v1/providers`);
        const res: ProvidersResponseJSON = response.data;
        this.setState({
            providers: res.providers,
        });
    }
}
