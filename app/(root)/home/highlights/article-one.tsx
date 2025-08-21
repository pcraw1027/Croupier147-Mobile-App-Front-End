import CroupierImage from "@/components/common/components/CroupierImage";
import InterMediumText from "@/components/common/components/Text/InterMediumText";
import InterSemiboldText from "@/components/common/components/Text/InterSemiboldText";
import InterText from "@/components/common/components/Text/InterText";
import { icons, images } from "@/icons";
import { useRouter } from "expo-router";
import { ScrollView, StatusBar, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HighlightDetailsPage = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="bg-white">
      <View className="bg-white flex flex-col h-screen">
        <View className="flex flex-row items-center mb-3 px-5">
          <TouchableOpacity onPress={() => router.back()}>
            <CroupierImage
              source={icons.backIcon}
              className="w-[40px] h-[40px]"
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerClassName="pb-[100px]"
          showsVerticalScrollIndicator={false}
        >
          <View className="relative w-full rounded-[12px] pb-5 px-5">
            <CroupierImage
              source={images.article01_1}
              resizeMode="cover"
              className="w-full h-[220px] rounded-[12px]"
            />

            <View className="absolute top-4 left-8 flex flex-row items-center gap-x-2">
              <View className="bg-green-light px-[12px] py-[4px] rounded-[4px] ">
                <InterSemiboldText
                  text="WEALTH GAP"
                  className="text-[12px] text-accent-2 tracking-[1.4px]"
                />
              </View>
              <View className="bg-green-light px-[12px] py-[4px] rounded-[4px] ">
                <InterSemiboldText
                  text="FINANCE"
                  className="text-[12px] text-accent-2 tracking-[1.4px]"
                />
              </View>
            </View>

            <View className="flex flex-row items-center justify-between py-5 ">
              <View className="flex flex-row items-center">
                <View className="flex flex-row items-center pr-5">
                  <CroupierImage
                    source={icons.clock}
                    className="w-[14px] h-[14px] mr-1"
                  />
                  <InterMediumText
                    text="5 mins"
                    className="text-text-neutral text-[14px]"
                  />
                </View>

                <View className="flex flex-row items-center">
                  <CroupierImage
                    source={icons.calendar}
                    className="w-[14px] h-[14px] mr-1"
                  />
                  <InterMediumText
                    text="29 Jul, 2025"
                    className="text-text-neutral text-[14px]"
                  />
                </View>
              </View>

              <CroupierImage
                source={icons.bookmark}
                className="w-[40px] h-[40px]"
              />
            </View>

            <InterSemiboldText
              text="The US wealth gap is large and growing, yet even worse for people of color"
              className="text-[20px] mb-5"
            />

            <View className="flex flex-row items-center justify-between py-3 border-y border-stroke">
              <View className="flex flex-row items-center">
                <View className="flex flex-row items-center pr-5">
                  <CroupierImage
                    source={icons.likeOutlined}
                    className="w-[14px] h-[14px] mr-1"
                  />
                  <InterMediumText
                    text="0 Likes"
                    className="text-accent-2 text-[16px]"
                  />
                </View>

                <View className="flex flex-row items-center">
                  <CroupierImage
                    source={icons.comment}
                    className="w-[14px] h-[14px] mr-1"
                  />
                  <InterMediumText
                    text="0 comments"
                    className="text-accent-2 text-[16px]"
                  />
                </View>
              </View>

              <CroupierImage
                source={icons.likeFilled}
                className="w-[40px] h-[40px]"
              />
            </View>

            <InterText
              text="Search any reputable research source, such as Pew Research Center’s 2020 study, and the conclusion is the same - the US wealth gap between upper and middle/lower income households is larger than it has been in a century, and continues to grow.  In fact the wealth gap is growing faster than the income gap between lower and higher income families.  In short, the rich are getting richer faster. "
              className="text-[16px] text-text-neutral leading-7 my-5"
            />

            <InterText
              text='"The wealth divide among upper-income families and middle- and lower-income families is sharp and rising"'
              className="text-[24px] leading-10 mb-5"
            />

            <InterText
              text="This inequality increase has risen markedly since the early 1980s when, perhaps not coincidentally, ‘trickle-down economics’ and financial deregulation both entered the US economic discussion.  Not surprisingly more than two thirds of US adults believe that the economic system requires a major overhaul to address this problem.  Frustratingly puzzling is that those who tack to the political right, and therefore mainly herald from many of the poorest states, are only at about 50% in favour of a major economic system overhaul."
              className="text-[16px] text-text-neutral leading-7 mb-5"
            />

            <InterText
              text="Affordable healthcare, affordable college and the federal budget deficit are amongst those issues seen as higher priority by most Americans, along with (illegal) immigration having joined the list of high priorities in recent years.  Interestingly, each of these stated higher priorities have more than a tangential connection to US wealth inequality. It could be reasonably argued that by addressing the wealth gap these perceived larger issues might be greatly reduced, if not eliminated completely."
              className="text-[16px] text-text-neutral leading-7 mb-5"
            />

            <InterText
              text="However, in addition to this growing national wealth gap there is one segment of US society who are getting even poorer even faster."
              className="text-[16px] text-text-neutral leading-7 mb-5"
            />

            <CroupierImage
              source={images.article01_2}
              resizeMode="cover"
              className="w-full h-[220px] rounded-[12px] mb-5"
            />

            <InterText
              text='"…their median wealth ($24,520) was about one-tenth the median wealth of households with a White householder ($250,400)"'
              className="text-[24px] leading-10 mb-5"
            />

            <InterText
              text="According to the US Census Bureau people of color (PoC) are 90% poorer than their white counterparts in the US.  The impact of this wealth gap on relative racial health outcomes, educational attainment, mortality and general life quality cannot be overstated.  Some suggest that PoC have achieved as much as their efforts and talents merit.  However, most others believe that within US society there exists a form of institutional racism manipulating access to opportunity based on race."
              className="text-[16px] text-text-neutral leading-7 mb-5"
            />

            <InterText
              text="Either way this does beg some searching questions.  Where does the racial wealth gap come from and how do we close it?  Is there a link between the racial wealth gap and our daily activities?  How many of our daily financial decisions help perpetuate this gap?  Could the now waning trend in corporate 'diversity' initiatives really help to address this problem?"
              className="text-[16px] text-text-neutral leading-7 mb-5"
            />

            <InterText
              text="There’s an even more strategic question to be considered in this topic area.  If PoC found a way to address their wealth inequality could it indicate a way for society in general to begin addressing the growing problem?  Given that PoC are fast becoming the majority of the US population perhaps the key to racial wealth equality is intrinsically that of the nation’s also anyway."
              className="text-[16px] text-text-neutral leading-7 mb-5"
            />

            <InterText
              text='"Five hundred years. That’s how long experts say it would take for Black people to reach economic parity with white people and close the racial wealth gap, given current trajectories."'
              className="text-[24px] leading-10 mb-5"
            />

            <InterText
              text="An article in WordInBlack.com by Bria Overs identified 9 Facts about the Racial Wealth Gap. Included in these were lower earnings, higher unemployment, lack of financial thinking and the plight of black owned businesses to mention but five.  What if there were a way to begin impacting these issues with every purchase we made?"
              className="text-[16px] text-text-neutral leading-7 mb-5"
            />

            <InterText
              text="Croupier147 was conceived to directly impact the racial wealth gap one purchase at a time.  We believe that informed consumers can make powerful choices, they type of choices that can change an economic trajectory.  Our mission is to build technology that turns product and company data about actionable insights that change consumer behaviour.  We believe that if informed, many consumers would make purchasing decisions that support their values of equitable employment, earning and opportunity for all groups of society.  And so we’re building that technology and collecting that data for this specific purpose."
              className="text-[16px] text-text-neutral leading-7 mb-5"
            />

            <InterText
              text="Come scan with us!"
              className="text-[16px] text-text-neutral leading-7 mb-5"
            />

            <InterText
              text="Sources:"
              className="text-[16px] text-text-neutral leading-7"
            />

            <InterText
              text="Most Americans Say There Is Too Much Economic Inequality in the U.S., but Fewer Than Half Call It a Top Priority, Juliana Menasce Horowitz, Ruth Igielnik and Rakesh Kochhar, Pew Research Center (2020)"
              className="text-[16px] text-text-neutral leading-7 mb-5"
            />

            <InterText
              text="Households With a White, Non-Hispanic Householder Were Ten Times Wealthier Than Those With a Black Householder in 2021, Briana Sullivan, Donald Hays, and Neil Bennett, US Census Bureau (2024)"
              className="text-[16px] text-text-neutral leading-7 mb-5"
            />

            <View className="flex flex-row">
              <InterText
                text="Curated by:"
                className="text-text-neutral text-[16px]"
              />

              <InterMediumText
                text="Croupier147"
                className="text-text-dark text-[16px] ml-3"
              />
            </View>
          </View>

          {/* <View className="bg-white-alt py-10 px-5"> */}
          {/* <View className="flex flex-row items-center mb-5">
              <InterSemiboldText text="Comments" className="text-[20px] mr-5" />

              <View className="h-[1px] w-2/3  bg-stroke" />
            </View> */}

          {/* <View className="border-b border-stroke pb-5 mb-5">
              <InterMediumText
                text="I have 4c type hair, and this flat iron worked great on my bags. I'm not sure how this would work on my whole head, but worked great for a bang touch up."
                className="text-text-dark text-[16px] leading-7 mb-3"
              />

              <View className="flex flex-row items-center pb-3">
                <View className="bg-green-dark flex items-center justify-center h-[24px] w-[24px] rounded-full">
                  <InterText text="L" className="text-white" />
                </View>

                <InterSemiboldText
                  text="lucky"
                  className="ml-3 text-[14px] text-text-neutral"
                />
              </View>

              <View className="flex flex-row items-center justify-between">
                <View className="flex flex-row">
                  <InterText text="1 mins" className="text-text-neutral mr-3" />
                  <InterText text="Reply" className="text-accent-2" />
                </View>

                <View className="flex flex-row items-center">
                  <View className="flex flex-row items-center pr-5">
                    <InterMediumText
                      text="12"
                      className="text-accent-2 text-[16px] mr-1"
                    />
                    <CroupierImage
                      source={icons.likeOutlined}
                      className="w-[14px] h-[14px]"
                    />
                  </View>

                  <View className="flex flex-row items-center">
                    <InterMediumText
                      text="4"
                      className="text-accent-2 text-[16px] mr-1"
                    />
                    <CroupierImage
                      source={icons.dislikeOutlined}
                      className="w-[14px] h-[14px]"
                    />
                  </View>
                </View>
              </View>
            </View> */}

          {/* <View className="border-b border-stroke pb-5">
              <InterMediumText
                text="I have 4c type hair, and this flat iron worked great on my bags. I'm not sure how this would work on my whole head, but worked great for a bang touch up."
                className="text-text-dark text-[16px] leading-7 mb-3"
              />

              <View className="flex flex-row items-center pb-3">
                <View className="bg-green-dark flex items-center justify-center h-[24px] w-[24px] rounded-full">
                  <InterText text="L" className="text-white" />
                </View>

                <InterSemiboldText
                  text="lucky"
                  className="ml-3 text-[14px] text-text-neutral"
                />
              </View>

              <View className="flex flex-row items-center justify-between">
                <View className="flex flex-row">
                  <InterText text="1 mins" className="text-text-neutral mr-3" />
                  <InterText text="Reply" className="text-accent-2" />
                </View>

                <View className="flex flex-row items-center">
                  <View className="flex flex-row items-center pr-5">
                    <InterMediumText
                      text="12"
                      className="text-accent-2 text-[16px] mr-1"
                    />
                    <CroupierImage
                      source={icons.likeOutlined}
                      className="w-[14px] h-[14px]"
                    />
                  </View>

                  <View className="flex flex-row items-center">
                    <InterMediumText
                      text="4"
                      className="text-accent-2 text-[16px] mr-1"
                    />
                    <CroupierImage
                      source={icons.dislikeOutlined}
                      className="w-[14px] h-[14px]"
                    />
                  </View>
                </View>
              </View>
            </View> */}
          {/* </View> */}

          {/* <View className="pt-10 px-5">
            <View className="flex flex-row items-center pb-3 border-b border-stroke">
              <View className="bg-green-dark flex items-center justify-center h-[24px] w-[24px] rounded-full">
                <InterText text="L" className="text-white" />
              </View>

              <InterMediumText
                text="Add a comment..."
                className="ml-5 text-[16px] text-text-neutral"
              />
            </View>
          </View> */}
        </ScrollView>
      </View>

      <StatusBar barStyle={"dark-content"} />
    </SafeAreaView>
  );
};

export default HighlightDetailsPage;
