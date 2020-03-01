import Switch from '../'
import { render, userEvent } from '@/packages/kiwi-core/src/test-utils'

const renderComponent = (props) => {
  const base = {
    components: { Toggle: Switch },
    ...props
  }
  return render(base)
}
it('should render correctly', () => {
  const { asFragment } = renderComponent(
    {
      template: `
    <Toggle />
    `
    }
  )
  expect(asFragment()).toMatchSnapshot()
})

it('should switch', async () => {
  const { getByTestId, container } = renderComponent(
    {
      template: `<Toggle data-testid="label" />`
    }
  )
  const label = getByTestId('label')
  const input = container.querySelector('input')
  userEvent.click(label)
  expect(input).toBeChecked()
})

it('should emit a change event', async () => {
  const spy = jest.fn()
  const { getByTestId } = renderComponent(
    {
      methods: {
        handleChange: spy
      },
      template: `<Toggle data-testid="label" @change="handleChange"  /> `
    }
  )

  const label = getByTestId('label')
  userEvent.click(label)

  expect(spy).toHaveBeenCalledTimes(1)
})