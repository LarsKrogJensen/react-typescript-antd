import * as React from "react";
import {Table, Row, Col, Input} from "antd";
import {TableColumnConfig} from "antd/lib/table/Table";
import {util} from "../util/util";
import {RowEx} from "./LayoutEx";
const Search = Input.Search;

export interface SearchPanelProps
{
}
interface SearchPanelState
{
}

export interface IUser
{
    key: number;
    name: string;
    age: number;
    address: string;

}

export class SearchTable extends Table<IUser>
{
    constructor(props: any)
    {
        super(props);
    }
}

export class SearchPanel extends React.Component<SearchPanelProps, SearchPanelState>
{
    constructor(props: SearchPanelProps, context: any)
    {
        super(props, context);
    }


    render()
    {
        //noinspection JSMismatchedCollectionQueryUpdate
        const columns: TableColumnConfig<IUser>[] = [{
            title: 'Name',
            dataIndex: 'name',
            width: 150,
            sorter: util.strCompare
        }, {
            title: 'Age',
            dataIndex: 'age',
            width: 150,
            sorter: util.numCompare
        }, {
            title: 'Address',
            dataIndex: 'address',
            sorter: util.strCompare
        }];

        //noinspection JSMismatchedCollectionQueryUpdate
        const data: IUser[] = [];
        for (let i = 0; i < 100; i++) {
            data.push({
                          key: i,
                          name: `Edward King ${i}`,
                          age: 32,
                          address: `London, Park Lane no. ${i}`,
                      });
        }

        return <div>
            <RowEx paddingBottom={24}>
                <Col span={24}>
                    <Search
                        placeholder="input search text"
                        style={{ width: 200 }}
                        onSearch={(value: any) => console.log(value)}/>
                </Col>
            </RowEx>
            <Row>
                <Col span={24}>
                    <SearchTable columns={columns}
                                 dataSource={data}
                                 pagination={false}
                                 size="small"/>
                </Col>
            </Row>
        </div>
    }
}
