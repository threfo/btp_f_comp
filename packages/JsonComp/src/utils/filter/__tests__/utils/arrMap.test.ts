import arrMapFilter from '../../utils/arrMap'
describe('utils/filter/utils/arrMap.ts', () => {
  it('arrMapFilter', () => {
    expect(
      arrMapFilter({
        ruleMap: {
          external_link: {
            rule: {
              key: 'page_template',
              valueKeyMap: {
                home_page: '/',
                jobs_page: '/job'
              }
            },
            key: 'url'
          },
          name: {
            key: 'label'
          },
          disabled: {}
        },
        data: [
          {
            name: '66666',
            jump_type: 'template_site',
            page_template: 'home_page',
            disabled: false
          },
          {
            name: '2343',
            jump_type: 'template_site',
            page_template: 'jobs_page'
          },
          {
            name: '2343',
            jump_type: 'template_site',
            external_link: 'http://baidu.com'
          }
        ]
      })
    ).toMatchSnapshot()

    expect(
      arrMapFilter({
        ruleMap: {
          jump_link: {
            key: 'href'
          },
          main_copy: {
            key: 'info',
            rule: {
              model: 'join',
              key: 'html',
              otherProps: {
                class:
                  'xl:text-4xl text-3xl whitespace-pre-wrap font-semibold text-blue-300'
              }
            }
          },
          sub_copy: {
            key: 'info',
            rule: {
              model: 'join',
              key: 'html',
              otherProps: {
                class:
                  'xl:text-xl text-lg whitespace-pre-wrap font-semibold text-gray-500'
              }
            }
          },
          description: {
            key: 'info',
            rule: {
              model: 'join',
              key: 'html',
              otherProps: {
                class: 'whitespace-pre-wrap font-semibold text-gray-800'
              }
            }
          }
        },
        data: [
          {
            picture: {
              id: '6217368dedf54d25aff9b050'
            },
            main_copy: '主文案',
            sub_copy: '副文案',
            description: '内容描述',
            jump_link: 'http://www.baidu.com'
          },
          {
            picture: {
              id: '6217368dedf54d25aff9b050'
            },
            main_copy: '主文案',
            description: '内容描述',
            jump_link: 'http://www.baidu.com'
          }
        ]
      })
    ).toMatchSnapshot()
  })
})
