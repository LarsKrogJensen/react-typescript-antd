import * as React from "react";
import {Table, Row, Col, Input, Icon} from "antd";
import {util} from "../util/util";
import * as lodash from "lodash";
import {api} from "../util/api";
import {SearchItem} from "../typings";
import Cancelable = _.Cancelable;

const Search = Input.Search;


export interface SearchPanelProps
{
    initSearch?: string;
    token?: string;
}

interface SearchPanelState
{
    loading: boolean;
    searchText: string;
    table: SearchItem[];
}


class SearchTable extends Table<SearchItem> { }
class SearchColumn extends Table.Column<SearchItem> { }

type PartialState = Partial<SearchPanelState>;

// class BasComponent<P,S> extends React.Component<P,S>
// {
//     constructor(props: P, context: any)
//     {
//         super(props, context);
//     }
//
//     protected updateState(state: Partial<S>, callback?: () => any)
//     {
//         this.setState({...this.state, ...state})
//     }
// }

export class SearchPanel extends React.Component<SearchPanelProps, SearchPanelState>
{
    private throttledSearch: Function & Cancelable = lodash.throttle(this.doSearch, 300, {
        leading: false,
        trailing: true
    });

    constructor(props: SearchPanelProps, context: any)
    {
        super(props, context);
        //this.props.token =
        this.state = {
            loading: false,
            searchText: "",
            table: []
        }
        this.onSearchTextChanged = this.onSearchTextChanged.bind(this);
    }

    private updateState(state: PartialState, callback?: () => any)
    {
        this.setState({...this.state, ...state}, callback)
    }

    private async doSearch(searchText: string)
    {
        let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJPaWtLQWZxSFkyeHBaVzUwU1VSQ2MybDRpMk55WldGMGFXOXVWR2x0WlZ3eU1ERTNMVEF4TFRJMlZEQTNPalE0T2pRd0xqWTJNaXN3TVRvd01Qcz0uMDgzM2ViMTRlMTQzYzg1YWE2YzcxZGYyZDg5OTA5NDExMjg3Njc4ZCIsImlhdCI6MTQ4NTQxMzMyMX0=.ClgE3NNz29DdL2lwWE5ZqCPrJTcT4qbDwPRst1Tbsuc="
        let searchResults: SearchItem[] = await api.search(token, searchText);
        this.updateState({table: searchResults,
                         loading: false})
    }

    private async performSearch()
    {
        if (!util.isNullOrEmpty(this.state.searchText)) {
            this.throttledSearch.cancel();
            this.throttledSearch(this.state.searchText);
        } else {
            this.updateState({table: [], loading: false})
        }
    }

    private onSearchTextChanged(evt: any)
    {
        this.updateState({searchText: evt.target.value, loading: true}, () =>
        {
            this.performSearch();
        })
    }

    render()
    {
        let locale = {
            // filterTitle: '??',
            // filterConfirm: '??',
            // filterReset: '??',
            emptyText: <span><Icon type="frown-o"/>Nothing found</span>,
        };

        return <div>
            <Row style={{paddingBottom: 24}} gutter={10}>
                <Col span={24}>
                    <Search
                        placeholder="input search text"
                        style={{ width: 200 }}
                        onChange={this.onSearchTextChanged}
                        onSearch={(value: any) => console.log(value)}/>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <SearchTable dataSource={this.state.table}
                                 pagination={false}
                                 rowKey="id"
                                 loading={this.state.loading}
                                 locale={locale}
                                 bordered={false}
                                 size="small">
                        <SearchColumn title='Id'
                                      key="id"
                                      dataIndex='id'
                                      width={100}
                                      sorter={util.strCompare}/>
                        <SearchColumn title='Score'
                                      key="score"
                                      dataIndex='score'
                                      width={150}
                                      sorter={util.numCompare}/>
                        <SearchColumn title='Name'
                                      key="name"
                                      dataIndex='name'
                                      width={150}
                                      sorter={util.strCompare}/>
                        <SearchColumn title='Long Name'
                                      key="longName"
                                      dataIndex='longName'
                                      sorter={util.strCompare}/>
                    </SearchTable>
                </Col>
            </Row>
        </div>
    }
}
