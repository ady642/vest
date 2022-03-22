import {addDoubleQuotes} from "../utils";
import UnitTestFactory from "../templates/UnitTestFactory";

const convertStringPropsToObject = (propsString: string): string => {
    return JSON.parse(propsString)
}

describe('convertStringPropsToObject', () => {
    it('should add double quotes on properties', () => {
        expect(addDoubleQuotes(`{ value: { type: Number, required: true } }`)).toEqual(
            `{ "value": { "type": "Number", "required": "true" } }`)
    })

    it('should return an object', () => {
        expect(convertStringPropsToObject(`{ "value": { "type": "Number", "required": "true" } }`))
            .toEqual({ value: { type: "Number", required: "true" } })
    })

    it('should return the name child', () => {
        const children = new UnitTestFactory('NattoBadge', `
        <template>
          <el-badge class="natto-badge" :hidden="value === 0" :value="value">
            <slot />
          </el-badge>
        </template>
        
        <script lang="ts">
        import { defineComponent } from 'vue'
        
        export default defineComponent({
          name: 'NattoBadge',
        
          props: {
            value: {
              type: Number,
              required: true
            }
          }
        })
        </script>
        
        <style lang="scss">
        .natto-badge {
          .el-badge__content.is-fixed {
            transform: translateY(-50%) translateX(50%);
          }
        }
        </style>
        `).getChildren(`
            <template>
              <el-badge class="natto-badge" :hidden="value === 0" :value="value">
                <slot />
              </el-badge>
            </template>
            
            <script lang="ts">
            import { defineComponent } from 'vue'
            
            export default defineComponent({
              name: 'NattoBadge',
            
              props: {
                value: {
                  type: Number,
                  required: true
                }
              }
            })
            </script>
            
            <style lang="scss">
            .natto-badge {
              .el-badge__content.is-fixed {
                transform: translateY(-50%) translateX(50%);
              }
            }
            </style>
        `)

        expect(children).toEqual([{ name: 'ElBadge', props: [{ name: 'hidden', type: 'boolean' }, { name: 'value', type: 'boolean' }] }])
    })
})

