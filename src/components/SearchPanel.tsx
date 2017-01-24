import * as React from "react";
import {Table, Row, Col, Input} from "antd";
//import {TableColumnConfig} from "antd/lib/table/Table";
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

class SearchTable extends Table<IUser>
{
}
class SearchColumn extends Table.Column<IUser>
{
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
            <Row style={{paddingBottom: 24}} gutter={10}>
                <Col span={24}>
                    <Search
                        placeholder="input search text"
                        style={{ width: 200 }}
                        onSearch={(value: any) => console.log(value)}/>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <SearchTable dataSource={data}
                                 pagination={false}
                                 bordered={false}
                                 size="small">
                        <SearchColumn title='Name'
                                      dataIndex='name'
                                      width={150}
                                      sorter={util.strCompare}/>
                        <SearchColumn title='Age'
                                      dataIndex='age'
                                      width={150}
                                      sorter={util.numCompare}/>
                        <SearchColumn title='Address'
                                      dataIndex='address'
                                      sorter={util.strCompare}/>
                    </SearchTable>
                </Col>
            </Row>
        </div>
    }
}
